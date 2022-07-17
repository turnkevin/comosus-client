import React from 'react';
import { UrlObject } from 'url';

import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

type CustomLinkProps = {
  children: React.ReactNode;
  highlight?: boolean;
  href: string | UrlObject;
  type?: 'default' | 'nav';
} & LinkProps;

export default function CustomLink({
  children,
  highlight,
  href,
  type = 'default',
  ...props
}: CustomLinkProps) {
  const variants = {
    default: (
      <NextLink href={href} passHref>
        <Link color="#FB446C" {...props}>
          {children}
        </Link>
      </NextLink>
    ),
    highlight: (
      <NextLink href={href} passHref>
        <Link
          color="#FB446C"
          fontWeight={700}
          textDecoration="underline"
          {...props}
        >
          {children}
        </Link>
      </NextLink>
    ),
    nav: (
      <NextLink href={href} passHref>
        <Link color="#55698C" fontWeight={700} {...props}>
          {children}
        </Link>
      </NextLink>
    ),
  };

  return highlight ? variants.highlight : variants[type];
}
