import {set} from 'mobx';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

interface Settings {
  section: string;
  header: string;
  icon: string;
  body: {
    name: string;
    icon: string;
    description: string;
    selected: boolean;
  }[];
}
[];

export const useSponsoredSettings = (props: any) => {
  const settings = [
    {
      section: 'campaign-type',
      header: 'Select campaign type',
      body: [
        {
          name: 'Banner',
          icon: 'string',
          description: 'string',
        },
        {
          name: 'Ad',
          icon: 'string',
          description: 'string',
        },
      ],
    },
    {
      section: 'campaign-placement',
      header: 'Select placement',
      body: [
        {
          name: 'Swipe',
        },
        {
          name: 'Radio',
        },
        {
          name: 'Collections',
        },
        {
          name: 'Search',
        },
        {
          name: 'Home',
        },
        {
          name: 'Shop',
        },
      ],
    },
    {
      section: 'campaign-name',
      header: 'Enter your campaign name',
    },
    {
      section: 'campaign-genres',
      header: 'Enter your campaign genre',
    },
    {
      section: 'campaign-active-period',
      header: 'Select the period of your campaign',
    },
    {
      section: 'campaign-wallet',
      header: 'Select a wallet',
      body: [
        {id: 'wallet_1', name: 'Wallet 1', amount: 20.4, currency: 'USD'},
        {id: 'wallet_2', name: 'Wallet 2', amount: 295.32, currency: 'GBP'},
      ],
    },
  ];

  const [settingsData, setSettingsData] = useState(settings);
  const [selectedValue, setSelectedValue] = useState('Wallet 1');
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('Ad');
  const [campaignGenre, setCampaignGenre] = useState(null);
  const [placement, setPlacement] = useState('Radio');
  const [date, setDate] = useState(new Date());
  const [activeAlways, setActiveAlways] = useState(false);
  const [activeStart, setActiveStart] = useState(null);
  const [activeEnd, setActiveEnd] = useState(null);
  const [settingsForm, setSettingsForm] = useState({
    'campaign-type': campaignType,
    'campaign-placement': placement,
    'campaign-name': campaignName,
    'campaign-active-period': {
      start: activeStart,
      end: activeEnd,
      isAlwaysActive: activeAlways,
    },
    'campaign-wallet': selectedValue,
    'campaign-genre': campaignGenre,
  });

  useEffect(() => {
    switch (campaignType) {
      case 'Ad':
        setPlacement('Swipe');
        const placements = [
          {
            name: 'Swipe',
          },
          {
            name: 'Radio',
          },
          {
            name: 'Collections',
          },
          {
            name: 'Search',
          },
          // {
          //   name: 'Shop',
          // },
        ];

        const data = settingsData; // Assuming settingsData is your array
        const indexToReplace = 1; // Index of the object you want to replace

        data[indexToReplace] = {
          section: 'campaign-placement',
          header: 'Select placement',
          body: placements,
        };

        return setSettingsData(data);

      default:
        setPlacement('Home');

        const placementsO = [
          {
            name: 'Home',
          },
          {
            name: 'Search',
          },
          // {
          //   name: 'Shop',
          // },
        ];

        const dataO = settingsData; // Assuming settingsData is your array
        const indexToReplaceO = 1; // Index of the object you want to replace

        dataO[indexToReplaceO] = {
          section: 'campaign-placement',
          header: 'Select placement',
          body: placementsO,
        };

        return setSettingsData(dataO);
    }
  }, [campaignType]);

  useEffect(() => {
    setSettingsForm({
      ...settingsForm,
      'campaign-type': campaignType,
      'campaign-placement': placement,
      'campaign-name': campaignName,
      'campaign-active-period': {
        start: activeStart,
        end: activeEnd,
        isAlwaysActive: activeAlways,
      },
      'campaign-wallet': selectedValue,
      'campaign-genre': campaignGenre,
    });
  }, [
    campaignType,
    placement,
    campaignName,
    activeStart,
    activeEnd,
    activeAlways,
    selectedValue,
  ]);

  const handleNavigateNext = () => {
    if (campaignName === '') return alert('Please enter a campaign name');
    if (campaignType === '') return alert('Please select a campaign type');
    if (placement === '') return alert('Please select a placement');
    if (!activeAlways) {
      if (activeStart === null) return alert('Please select a start date');
      if (activeEnd === null) return alert('Please select an end date');
    }
    if (selectedValue === '') return alert('Please select a wallet');
    if (campaignGenre === '') return alert('Please enter a campaign genre');

    Alert.alert(`Sponsored Placements`, `${placement} ${campaignType}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Start',
        onPress: async () => {
          props.navigation.navigate('Sponsored_Form_2', {settingsForm});
        },
      },
    ]);
  };

  return {
    settingsData,
    selectedValue,
    setSelectedValue,
    campaignName,
    setCampaignName,
    placement,
    setPlacement,
    campaignType,
    setCampaignType,
    date,
    setDate,
    setActiveAlways,
    activeAlways,
    handleNavigateNext,
    activeStart,
    setActiveStart,
    activeEnd,
    setActiveEnd,
    settingsForm,
    campaignGenre,
    setCampaignGenre,
  };
};
