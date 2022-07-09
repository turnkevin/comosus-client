import React, { useState } from 'react';
import { useToggle } from '@src/utils/hooks';
import { useTranslation } from 'react-i18next';
import { useOnboardUserMutation } from '@generated/graphql.queries';
import { useApiClient } from '@src/common/contexts';
import { useRouter } from 'next/router';
import { AppRoute, GlobalRoute } from '@src/constants';

import { VStack } from '@chakra-ui/react';
import { PageContainer } from '@src/common/components';
import { OnboardedMessage, OnboardingForm } from '@src/modules/onboarding';

export default function Onboarding() {
  const { t } = useTranslation('onboarding');
  const head = { title: t('title') };

  const router = useRouter();
  const { id } = router.query;

  const { gqlClient } = useApiClient();
  const [email, setEmail] = useState('');
  const [isOnboarded, toggleIsOnboarded] = useToggle();
  const { mutate: onboardUser, isLoading: isOnboarding } =
    useOnboardUserMutation(gqlClient, {
      onSettled: (data) => {
        if (data) {
          setEmail(data.onboardUser.email);
          toggleIsOnboarded();
        }
      },
    });

  if (typeof id !== 'string') {
    router.push(GlobalRoute.Error);
    return;
  }

  const onSubmit = (values: OnboardingFormValues) => {
    onboardUser({
      payload: {
        // @TODO: Casting the route query feels wrong and could lead to error, need to fix this later
        id: id as string,
        ...values,
      },
    });
  };

  const onContinue = () => {
    router.push(AppRoute.Admin);
  };

  return (
    <PageContainer head={head}>
      <VStack alignSelf="center" width="670px" align="stretch" gap="60px">
        {isOnboarded ? (
          <OnboardedMessage onContinue={onContinue} email={email} />
        ) : (
          <OnboardingForm onSubmit={onSubmit} isOnboarding={isOnboarding} />
        )}
      </VStack>
    </PageContainer>
  );
}
