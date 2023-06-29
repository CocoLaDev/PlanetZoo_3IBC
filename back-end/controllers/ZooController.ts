import User from "../models/user";
import { Request, Response } from "express";

class ZooController {
  public async canZooOpen(req: Request, res: Response): Promise<void> {
    try {
      const day = req.params.day; // supposez que le jour est passé en tant que paramètre de l'URL

      // Récupérez tous les utilisateurs assignés pour ce jour
      const users = await User.find({ assignedDays: day });

      // Comptez le nombre d'employés pour chaque rôle
      const counts = {
        accueilAgent: 0,
        veterinarian: 0,
        entretienAgent: 0,
        seller: 0,
      };

      for (const user of users) {
        if (counts.hasOwnProperty(user.role)) {
          counts[user.role as keyof typeof counts]++;
        }
      }

      // Vérifiez si le zoo a suffisamment d'employés pour chaque rôle
      if (
        counts.accueilAgent >= 1 &&
        counts.veterinarian >= 1 &&
        counts.entretienAgent >= 1 &&
        counts.seller >= 1
      ) {
        res.status(200).json({ canOpen: true });
      } else {
        res.status(200).json({ canOpen: false });
      }
    } catch (error: any) {
      console.log("Error checking if zoo can open:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ZooController();
