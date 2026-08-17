-- Run once in phpMyAdmin to add the Expenses module.

CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  cat VARCHAR(40) NOT NULL DEFAULT 'Other',
  amt DECIMAL(12,2) NOT NULL DEFAULT 0,
  spent_on DATE NOT NULL,
  method VARCHAR(40) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  receipt VARCHAR(80) DEFAULT NULL,
  created_by VARCHAR(120) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_spent (spent_on),
  INDEX idx_cat (cat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
