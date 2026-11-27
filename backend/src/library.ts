import type { Pool } from 'pg';
export function createLibrary(pool:Pool) {
 return {
 async list(userId:string) {
 const favorites=await pool.query('SELECT c.id,c.work_title,c.release_title FROM favorites f JOIN public_catalog c ON c.id=f.catalog_id WHERE f.user_id=$1 ORDER BY f.created_at DESC LIMIT 100',[userId]);
 const history=await pool.query('SELECT c.id,c.work_title,h.last_played_at FROM listening_history h JOIN public_catalog c ON c.id=h.catalog_id WHERE h.user_id=$1 ORDER BY h.last_played_at DESC LIMIT 100',[userId]);
 return {favorites:favorites.rows,history:history.rows};
 },
 async favorite(userId:string,id:string,enabled:boolean) {
 if(enabled) await pool.query('INSERT INTO favorites(user_id,catalog_id) SELECT $1,id FROM public_catalog WHERE id=$2 ON CONFLICT DO NOTHING',[userId,id]);
 else await pool.query('DELETE FROM favorites WHERE user_id=$1 AND catalog_id=$2',[userId,id]);
 },
 async played(userId:string,id:string) {
 await pool.query('INSERT INTO listening_history(user_id,catalog_id) SELECT $1,id FROM public_catalog WHERE id=$2 ON CONFLICT(user_id,catalog_id) DO UPDATE SET last_played_at=now()',[userId,id]);
 }
 };
}
