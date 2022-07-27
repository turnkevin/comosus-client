import React, { useState } from 'react';
import { useApiClient } from '@common/contexts';
import { useVerifyAccountSendEmailMutation } from '@generated/graphql.queries';
import { useTranslation } from 'react-i18next';
import { VStack, Button } from '@chakra-ui/react';
import { PageContainer, Text } from '@src/common/components';

type OnboardingStaticProps = {
  query: { id: string };
};
export async function getServerSideProps(context: OnboardingStaticProps) {
  return { props: { id: context.query.id } };
}

type PleaseVerifyAccountProps = {
  id: string;
};

export default function PleaseVerifyAccount({ id }: PleaseVerifyAccountProps) {
  const { gqlClient } = useApiClient();
  const { t } = useTranslation('auth');
  const head = { title: t('please-verify-account.title') };
  const [message, setMessage] = useState();

  const { mutate: verifyAccountSendEmail } = useVerifyAccountSendEmailMutation(
    gqlClient,
    {
      onSettled: (data, error) => {
        if (error) {
          console.error(error);
        }
        if (data) {
          setMessage(t('please-verify-account.page.success-message'));
        }
      },
    },
  );

  const handleClick = () => {
    if (typeof id === 'string') {
      verifyAccountSendEmail({
        detail: {
          id,
        },
      });
    }
  };

  return (
    <PageContainer head={head}>
      <VStack>
        <Text type="h3" maxWidth="640px" mb="1rem">
          {t('please-verify-account.page.title')}
        </Text>
        <Button
          color="#fff"
          backgroundColor="#FB446C"
          width="100%"
          onClick={handleClick}
        >
          {t('please-verify-account.page.button')}
        </Button>
        <Text>{message}</Text>
      </VStack>
    </PageContainer>
  );
}
