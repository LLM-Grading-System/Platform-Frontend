import React from "react";
import { useNavigate, useLocation  } from "react-router";
import {
    IconHome2,
    IconLogout,
    IconSun,
    IconMoon,
    IconHexagonPlus2,
    IconStack2,
  } from '@tabler/icons-react';
import { Outlet } from "react-router";
import classes from "./index.module.css";
import { Container, ScrollArea, Stack } from "@mantine/core";
import NavbarLink from "../../components/navbar-link";
import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import TokenService from "../../services/localStorage/auth-token";
import { HOME_PATH, LOGIN_PATH, NEW_TASK_PATH, TASKS_PATH } from "../../app/paths";


const mockdata = [
    { icon: IconHome2, label: 'Главная', path: HOME_PATH, index: true },
    { icon: IconStack2, label: 'Задачи', path: TASKS_PATH, index: false},
    { icon: IconHexagonPlus2,  label: 'Создать задачу', path: NEW_TASK_PATH, index: false},
  ];

interface BaseLayoutProps {
    children?: React.ReactNode
}


const BaseLayout: React.FC<BaseLayoutProps> = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    let navigate = useNavigate();
    let location = useLocation()

    const logout = () => {
        TokenService.clear();
        navigate(LOGIN_PATH)
    }

    const links = mockdata.map((link) => (
        <NavbarLink
          label={link.label}
          icon={link.icon}
          key={link.label}
          active={location.pathname === link.path || (location.pathname === "/" && link.index)}
          onClick={() => navigate(link.path)}
        />
      ));

    return (
        <Container fluid px={0}>
            <div className={classes.main}>
                <nav className={classes.navbar}>
                    <div className={classes.navbarMain}>
                        <Stack justify="center" gap={0}>
                        {links}
                        </Stack>
                    </div>

                    <Stack justify="center" gap={0}>
                        <NavbarLink 
                            icon={computedColorScheme === "light"? IconSun: IconMoon} 
                            label="Сменить тему" 
                            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')} 
                        />
                        <NavbarLink onClick={logout} icon={IconLogout} label="Выйти из аккаунта" />
                    </Stack>
                </nav>
                <ScrollArea px={32} pt={40} scrollbars="y" className={classes.content}>
                    <Outlet />
                </ScrollArea>
            </div>
        </Container>
    )
}

export default BaseLayout;