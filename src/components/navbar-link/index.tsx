import { IconHome2 } from '@tabler/icons-react';
import { Tooltip, UnstyledButton } from '@mantine/core';
import classes from "./index.module.css";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ icon: Icon, label, active, onClick }) => {
    return (
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
          <Icon size={20} stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
}
export default NavbarLink;