import { Link } from "react-router";
import { Text, Breadcrumbs, Anchor } from "@mantine/core";


interface AppBreadcrumb {
    label: string,
    url: string | null,
}

interface AppBreadcrumbsProps {
    breadcrumbs: Array<AppBreadcrumb>
}


const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = ({breadcrumbs}) => {
    return (
        <Breadcrumbs>
            {
                breadcrumbs.map(breadcrumb => (
                    breadcrumb.url 
                    ? (
                        <Link key={breadcrumb.label} to={breadcrumb.url}>
                            <Anchor component="span">
                                {breadcrumb.label}
                            </Anchor> 
                        </Link>

                    ): <Text key={breadcrumb.label}>{breadcrumb.label}</Text>
                ))
            }
        </Breadcrumbs>
    )
}

export default AppBreadcrumbs;