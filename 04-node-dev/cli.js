import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

// 1. recuperar la carpeta a listar
console.log('CLI tool is running...');
const dir = process.argv[2] ?? '.';
console.log("arguments", dir);

// 2. formateo de los tamaños
const formatByte = (size) => {
  if (size < 1024) return size + ' B'
  else if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  else if (size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB'
  else return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
}

// 3. leer los nombres, sin informacio
const files = await readdir(dir)

// 4. recuperar toda la info de los files
const entries = await Promise.all(
    files.map(async (name) => {
        const fullPath = join(dir, name)
        const info = await stat(fullPath)

        return {
            name,
            size: formatByte(info.size),
            isFile: info.isFile(),
            isDirectory: info.isDirectory(),
            modified: info.mtime,
        }
    })
)

// 5. ordenar por carpeta y alphabeticamente
entries.sort((a, b) => {
    if (a.isDirectory && !b.isDirectory) return -1
    if (!a.isDirectory && b.isDirectory) return 1
    return a.name.localeCompare(b.name)
})

// 6. imprimir la info
for (const entry of entries) {
    console.log(`${entry.isDirectory ? '📁' : '📄'} ${entry.name} - ${entry.size} - modified: ${entry.modified}`);
}