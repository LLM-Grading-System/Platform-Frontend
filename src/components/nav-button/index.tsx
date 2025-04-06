import { ActionIcon, Tooltip } from "@mantine/core";
import { IconChevronRightPipe } from "@tabler/icons-react";
import { Link } from "react-router";

interface AppNavButtonProps {
    value: string;
}

const AppNavButton: React.FC<AppNavButtonProps> = ({value}) => {
    return (
      <Link to={value}>
          <Tooltip label={"Перейти"} withArrow position="right">
            <ActionIcon color={"gray"} variant="subtle">
              <IconChevronRightPipe size={16} /> 
            </ActionIcon>
          </Tooltip>
      </Link>
    );
  }

export default AppNavButton;