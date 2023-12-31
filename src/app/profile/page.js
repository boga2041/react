    'use client'
    import { useSession } from "next-auth/react";
    import Image from "next/image";
    import { useEffect, useState } from "react";

    export default function ProfilePage() {
        const session = useSession();
        const { status } = session;
        const [saved,setSaved] = useState(false)

        const [isSaving, setIsSaving] = useState(false)

        // Inicializar userName solo si session.data y session.data.user están definidos
        const [userName, setUserName] = useState(session.data?.user?.name || '');

        // Actualizar userName solo cuando el usuario se autentica y userName está vacío
        useEffect(() => {
            if (status === 'authenticated' && session.data?.user && !userName) {
                setUserName(session.data.user.name);
            }
        }, [session, status, userName]);

        // Manejo del envío del formulario
        async function handleProfileInfoUpdate(ev) {
    
            setSaved(false);
            setIsSaving(true);
            ev.preventDefault();
            const response = await fetch('api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name:userName}),


            })
            setIsSaving(false);
            if(response.ok){
                setSaved(true);
            }
        }
        async function handleFileChange(ev) {
            // Acceder a los archivos del input
            const files = ev.target.files;
        
            // Si hay archivos, mostrar el primero en consola
            if (files.length > 0) {
                console.log("Archivo seleccionado:", files[0]);
            }
        
            // Enviar un simple mensaje al servidor
            const response = await fetch('api/upload/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: "Hola Mundo" }),
            });
            
        
            const responseData = await response.json();
            console.log(responseData);
        }
        
        
        
        
        

        // Renderizado condicional basado en el estado de la sesión
        if (status === 'loading') {
            return 'Loading...';
        }

        if (status === 'unauthenticated') {
            // Supongo que quieres redirigir al usuario, deberías usar un enfoque diferente
            // como Router.push('/login') de next/router en lugar de return redirect('/login')
            return 'Redirecting to login...';
        }

        const userImage = session.data.user.image;
        const useremail = session.data.user.email;

        return (
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl mb-4">
                    Profile
                    </h1>
            
                <div className="max-w-md mx-auto">
                    {saved && (

                    <h2 className="text-center bg-green-200 rounded-lg p-4 border-4 border-green-300">
                    Profile saved!
                    </h2>
                    )}
                    {isSaving &&(

                        <h2 className="text-center bg-blue-200 rounded-lg p-4 border-4 border-blue-300">
                        Saving...
                        </h2>
                    )}
                    <div className="flex gap-4 items-center">
                        <div>
                            <div className="p-2 rounded-lg relative">
                                <Image
                                    className="rounded-lg w-full h-full mb-1"
                                    src={userImage}
                                    width={250}
                                    height={250}
                                    alt={'avatar'}
                                />
                                <label >
                                <input type="file" className="hidden" onChange={handleFileChange}></input>
                                <span className="block border  rounded-lg p-2 border-gray-300  text-center cursor-pointer">Edit</span>
                                </label>
                                
                            
                            </div>
                        </div>
                        <form className="grow" onSubmit={handleProfileInfoUpdate}>
                            <input
                                type="text"
                                placeholder="First and last name"
                                value={userName}
                                onChange={ev => setUserName(ev.target.value)}
                            />
                            <input type="email" disabled={true} value={useremail} />
                        
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
