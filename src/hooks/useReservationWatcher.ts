/**
 * useReservationWatcher
 * ----------------------
 * Runs as a global background process (mounted at App level).
 * Every 3 seconds it:
 *   1. Reads /slots fresh from Firebase
 *   2. Finds any slots where isReserved=true AND reservedUntil has passed
 *   3. Clears isReserved + reservedUntil in one atomic multi-path update
 *   4. Writes a log entry for each expired slot
 *
 * Because it reads directly from Firebase (not from React state) it always
 * acts on the freshest data available, even if the Dashboard tab isn't open.
 */
import { useEffect } from 'react';
import { db } from '../firebase';
import { ref, get, update, push } from 'firebase/database';

export function useReservationWatcher() {
    useEffect(() => {
        const check = async () => {
            try {
                const snap = await get(ref(db, 'slots'));
                if (!snap.exists()) return;

                const data = snap.val();
                const now = Date.now();
                const updates: Record<string, any> = {};
                const expired: string[] = [];

                Object.keys(data).forEach(slotId => {
                    const slot = data[slotId];
                    if (slot.isReserved && slot.reservedUntil) {
                        const until = new Date(slot.reservedUntil).getTime();
                        if (until <= now) {
                            updates[`slots/${slotId}/isReserved`] = false;
                            updates[`slots/${slotId}/reservedUntil`] = null;
                            expired.push(slotId);
                        }
                    }
                });

                if (expired.length > 0) {
                    updates['system/lastUpdated'] = now;
                    await update(ref(db), updates);
                    // Log each expiry
                    for (const slotId of expired) {
                        push(ref(db, 'logs'), {
                            slot: slotId,
                            action: 'reservation_expired',
                            timestamp: now,
                        });
                    }
                    console.log(`[ReservationWatcher] Expired ${expired.length} reservation(s):`, expired);
                }
            } catch (e) {
                // Silently absorb transient network errors
            }
        };

        // Run immediately on mount, then every 3 seconds
        check();
        const id = setInterval(check, 3000);
        return () => clearInterval(id);
    }, []);
}
