import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

let content = ''
if (process.permission.has('fs.read', 'archivo.txt')) {
    content = await readFile('archivo.txt', 'utf-8')
    console.log(content)
} else {
    console.log('No tienes permiso para leer el archivo.')
    process.exit(1)
}


if (process.permission.has('fs.write', 'output')) {
    const outputDir = join('output', 'files', 'documents')
    await mkdir(outputDir, { recursive: true })
    const upperCaseContent = content.toUpperCase()
    const outputFilePath = join(outputDir, 'archivo-uppercase.txt')

    console.log('La extension es ', extname(outputFilePath))
    console.log('el nombre es ', basename(outputFilePath))

    await writeFile(outputFilePath, upperCaseContent)
    console.log('Archivo creado con contenido en mayúsculas')
} else {
    console.log('No tienes permiso para escribir en el directorio de salida.')
    process.exit(1)
}

