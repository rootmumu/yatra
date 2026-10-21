import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yathra_super_secret_jwt_key_2026';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'yathra2026';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please enter username and password.' });
    }

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const token = jwt.sign(
      { username: ADMIN_USER, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Admin authenticated successfully',
      token,
      user: {
        username: ADMIN_USER,
        role: 'admin',
        brand: 'YATHRA Escapes'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      username: req.user.username,
      role: req.user.role,
      brand: 'YATHRA Escapes'
    }
  });
};

export const logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};
