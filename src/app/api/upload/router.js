export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log('Hola desde el servidor');

        // Opcional: Manejar el cuerpo de la solicitud
        const body = req.body;
        console.log(body);

        res.status(200).json({ message: 'Mensaje recibido' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
