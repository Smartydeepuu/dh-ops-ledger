-- Run this once in phpMyAdmin (Import or SQL tab) to add the Documents module.

CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  cat VARCHAR(40) NOT NULL DEFAULT 'Other',
  filename VARCHAR(80) NOT NULL,
  size INT NOT NULL DEFAULT 0,
  mime VARCHAR(80) DEFAULT NULL,
  uploaded_by VARCHAR(120) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_cat (cat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
