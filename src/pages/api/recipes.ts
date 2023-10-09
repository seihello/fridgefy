import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import queryString from 'query-string';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const API_KEYS: string[] = process.env.NEXT_PUBLIC_API_KEYS!.split(",");

  let responseData: any;
  let status: number = 500;
  for(let i = 0; i < API_KEYS.length; i++) {
    const query = { apiKey: API_KEYS[i], ...req.query};
    
    try {
      const result = await axios('https://api.spoonacular.com/recipes/complexSearch?' + queryString.stringify(query, { arrayFormat: 'comma' }));
      status = result.status;
      responseData = result.data;
      break;
    } catch (error: any) {
      status = error.response?.status;
      responseData = { query };
    }
  }

  res.status(status).json(responseData)  
}