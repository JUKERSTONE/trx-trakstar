import {useEffect, useState} from 'react';
import {SStore} from '../../stores';

export const useSponsoredStrategy = (props: any) => {
  const [camapignLimit, setCampaignLimit] = useState(0);
  const [maxCostPerImpression, setMaxCostPerImpression] = useState(0);
  const [stategyData, setStrategyData] = useState({});

  useEffect(() => {
    setStrategyData({
      camapignLimit,
      maxCostPerImpression,
    });
  }, [camapignLimit, maxCostPerImpression]);

  console.log(
    '🚀 ~ file: useSponsoredStrategy.ts:8 ~ useSponsoredStrategy ~ props:',
    props,
  );

  const formParams = props.route.params;

  const strategyData = [
    {
      section: 'strategy-wallet',
      header: 'Selected wallet',
      body: [],
    },
    {
      section: 'campaign-spend-limit',
      header: 'Set a campaign limit',
      body: 'If no campaign limit is set, your campaign will continuously spend the wallets available balance.',
    },
    {
      section: 'strategy-cost-per-impression',
      header: 'Enter your maximum cost per impression',
    },
  ];

  const handleNavigatePreview = () => {
    props.navigation.navigate('Sponsored_Preview', {
      ...props.route.params,
      strategy: stategyData,
    });
  };

  return {
    strategyData,
    handleNavigatePreview,
    formParams,
    setCampaignLimit,
    camapignLimit,
    setMaxCostPerImpression,
    maxCostPerImpression,
  };
};
