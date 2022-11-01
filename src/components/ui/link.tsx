import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactElement } from "react";

const Link: React.FC<NextLinkProps & { className?: string; title?: string; children: ReactElement | {} }> =
  ({ href, children, ...props }) => {
    return (
      <NextLink href={href}>
        <a {...props}>{children}</a>
      </NextLink>
    );
  };

export default Link;
