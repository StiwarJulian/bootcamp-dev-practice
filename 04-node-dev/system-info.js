import os from 'node:os'
import ms from 'ms'

console.log('Información del sistema operativo:')
console.log(`Tipo de SO: ${os.type()}`)
console.log(`Plataforma: ${os.platform()}`)
console.log(`Arquitectura: ${os.arch()}`)
console.log(`Memoria total: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`)
console.log(`Memoria libre: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`)
console.log(`Directorio home: ${os.homedir()}`)
console.log(`Hostname: ${os.hostname()}`)
console.log(`Número de CPUs: ${os.cpus().length}`)
console.log('Interfaces de red:')
const networkInterfaces = os.networkInterfaces()
for (const [name, interfaces] of Object.entries(networkInterfaces)) {
  for (const iface of interfaces) {
    console.log(`- ${name} (${iface.family}): ${iface.address} ${iface.internal ? '(Interno)' : ''}`)
  }
}
console.log(`Tiempo de actividad del sistema: ${ms(os.uptime() * 1000, { long: true})}`)

console.log('Directorio temporal:', os.tmpdir())
console.log('Fin de la información del sistema operativo.')