import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTES = `${__dirname}/`;
const router = Router();

const cleanFileName = (fileName: string) => {
    return fileName.replace('.ts', '')
}

readdirSync(PATH_ROUTES).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== 'index') {
        import(`./${cleanName}`).then((moduleRouter) => {
            console.log(`Se está cargando la ruta....../${cleanName}`)
            router.use(`/${cleanName}`, moduleRouter.router);
        });
    }
});


export { router }