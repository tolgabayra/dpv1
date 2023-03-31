/* eslint-disable @next/next/no-img-element */
import getConfig from 'next/config';
import React, { useContext, useRef, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Page } from '../../../types/types';
import { appAxios } from '@/utils/axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Toast } from "primereact/toast"

const RegisterPage: Page = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const router = useRouter()
    const toast = useRef<Toast>(null);


    const handleRegister = () => {
        appAxios.post("/api/v1/auth/register", {
            username,
            email,
            password
        }, { withCredentials: true })
            .then(() => {
                setTimeout(() => {
                    router.push("/auth/login")
                }, 3000)
                toast.current?.show({ severity: 'success', summary: 'Başarılı', detail: 'Hesabınız Oluşturuldu', life: 3000 });
            })
            .catch(err => {
                console.log(err);
                toast.current?.show({ severity: 'warn', summary: 'Başarısız', detail: 'Hesabınız Oluşturulmadı!', life: 3000 });

            })
    }



    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`${contextPath}/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Hoşgeldin, Buradan Kayıt Oluşturabilirsin!</div>
                            <span className="text-600 font-medium">Hesabınızdaki verileriniz şifrelenmektedir.</span>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-900 text-xl font-medium mb-2">
                                Kullanıcı Adı
                            </label>
                            <InputText onChange={(e) => setUsername(e.target.value)} id="email1" type="text" placeholder="Kullanıcı Adı" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText onChange={(e) => setEmail(e.target.value)} id="email1" type="text" placeholder="Email adresi" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Parola
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parola" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">

                                <Link href="/auth/login" className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Hesabınız Var Mı?
                                </Link>
                            </div>
                            <button onClick={handleRegister} className=" bg-indigo-400 p-2 px-6 text-white border-0 hover:bg-indigo-500 hover:pointer cursor-pointer ">Kayıt Ol</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

RegisterPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default RegisterPage;
