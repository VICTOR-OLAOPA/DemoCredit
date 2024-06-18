import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const KARMA_API_BASE_URL = process.env.KARMA_API_BASE_URL;
const KARMA_API_KEY = process.env.KARMA_API_KEY;

class KarmaService {
  static async checkKarmaBlacklist(identity: string) {
    try {
      const response = await axios.get(
        `${KARMA_API_BASE_URL}/verification/karma/:identity?identity=${identity}`,
        {
          headers: {
            Authorization: `Bearer ${KARMA_API_KEY}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error checking Karma blacklist', error);
    }
  };
}
export default KarmaService;
