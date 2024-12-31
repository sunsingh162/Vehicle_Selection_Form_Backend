import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import MODELS from './data/mockdata';

const app = express();
const upload = multer();

app.use(express.json());
app.use(cors());

interface VehicleData {
    make: string;
    model: string;
    badge: string;
  }  

app.get('/mockdata', async (req: Request, res: Response) => {
    try {
      res.json(MODELS);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch model data' });
    }
  });
  
  app.post('/upload', upload.single('logbook'), async (req: Request, res: Response) => {
    try {
        const body: VehicleData = req.body;
        const logbook = req.file?.buffer.toString();
  
      if (!body.make || !body.model || !body.badge) {
        throw new Error('Missing required fields: make, model, or badge.');
      }

      if (!logbook) {
        throw new Error('Logbook file is missing or invalid.');
      }
  
      res.json({
        make: body.make,
        model: body.model,
        badge: body.badge,
        logbook,
      });
    } catch (err) {
      res
        .status(400)
        .json({ error: err instanceof Error ? err.message : 'An unexpected error occurred' });
    }
  });
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  