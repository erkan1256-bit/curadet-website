import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createDb} from '../../src/db.js';
import {migrate} from '../../src/migrate.js';
import {createLibrary} from '../../src/library.js';
test('library data is isolated by account', {skip:!process.env.CURADET_TEST_DATABASE_URL}, async()=>{
 const pool=createDb(process.env.CURADET_TEST_DATABASE_URL!);
 try{
 await migrate(pool);
 await pool.query("INSERT INTO accounts(id) VALUES ('library-a'),('library-b')");
 await pool.query("INSERT INTO works(id,title) VALUES ('library-work','Library test')");
 await pool.query("INSERT INTO recordings(id,work_id,source_class,rights_state,provenance_state) VALUES ('library-rec','library-work','curadet_original','cleared','verified')");
 await pool.query("INSERT INTO releases(id,title,publication_state) VALUES ('library-release','Library release','published')");
 await pool.query("INSERT INTO release_recordings VALUES ('library-release','library-rec')");
 await pool.query("INSERT INTO catalog_entries(id,release_id,recording_id,visible) VALUES ('library-entry','library-release','library-rec',true)");
 const library=createLibrary(pool);
 await library.favorite('library-a','library-entry',true);
 await library.favorite('library-a','library-entry',true);
 await library.played('library-a','library-entry');
 assert.equal((await library.list('library-a')).favorites.length,1);
 assert.equal((await library.list('library-a')).history.length,1);
 assert.equal((await library.list('library-b')).favorites.length,0);
 assert.equal((await library.list('library-b')).history.length,0);
 await library.favorite('library-a','library-entry',false);
 assert.equal((await library.list('library-a')).favorites.length,0);
 }finally{await pool.end();}
});
