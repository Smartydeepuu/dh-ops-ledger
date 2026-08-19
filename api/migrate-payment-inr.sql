-- Run this once in phpMyAdmin (Import or SQL tab) to store each payment's
-- actual INR amount instead of re-deriving it from today's live FX rate.

ALTER TABLE payments ADD COLUMN inr_amount DECIMAL(18,2) NULL AFTER amt;
