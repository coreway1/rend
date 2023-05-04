import {Modal, Navigation, FormLayout, TextField, Toast, Frame} from '@shopify/polaris';
import {HomeMajor, ConversationMinor, SettingsMajor, QuestionMarkInverseMajor} from '@shopify/polaris-icons';


export function NavigationSidebar() {


  return (
    <>
   <Navigation location={location.pathname}>
          <Navigation.Section
          items={[
            {
              label: 'Insurance Protection'
            },
          ]}
        />
          <Navigation.Section
          separator
          title="Insurance Protection"
            items={[
              {
                url: '/',
                label: 'Dashboard',
                icon: HomeMajor,
                exactMatch: true,
              },
              {
                label: 'Settings',
                icon: SettingsMajor,
                url: '/settings'
              }
            ]}
            action={{
              icon: ConversationMinor,
              accessibilityLabel: 'Contact support',
              
            }}
          />
        </Navigation>

   </>
  );
}