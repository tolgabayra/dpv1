/* eslint-disable @next/next/no-img-element */
import getConfig from 'next/config';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';
import { SplitButton } from 'primereact/splitbutton'
import { appAxios } from '@/utils/axios';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {

    const handleLogout = async () => {
        const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
            method: "POST",
            credentials: "include"
        })
        if (res.ok) {
            toast.current?.show({ severity: 'success', summary: 'Başarılı', detail: 'Çıkış yapılıyor.', life: 3000 });
            setTimeout(() => {
                router.push("/auth/login")
            }, 3000)
        }
        else {
            toast.current?.show({ severity: 'warn', summary: 'Başarısız', detail: 'Opps, Lütfen bilgilerinizi kontrol ediniz!', life: 3000 });

        }
    }



    const items = [
        {
            label: 'Profil',
            icon: 'pi pi-user',
            command: () => {
            }
        },
        {
            label: 'Ayarlar',
            icon: 'pi pi-cog',
            command: () => {
            }
        },

        {
            label: 'Çıkış Yap',
            icon: 'pi pi-upload',
            command: () => {
                handleLogout()
            }
        }
    ];
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Toast ref={toast} />
            <Link href="/" className="layout-topbar-logo">
                <img src={`${contextPath}/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>SAKAI</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>


                <SplitButton icon="pi pi-user" label="Ben" size='small' model={items} className="mr-2 mb-2"></SplitButton>


            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
