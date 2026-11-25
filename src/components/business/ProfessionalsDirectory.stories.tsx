import type { Meta, StoryObj } from '@storybook/react';
import { BusinessManagerProvider } from '../../contexts/BusinessManagerContext';
import ProfessionalsDirectory from './ProfessionalsDirectory';

const meta: Meta<typeof ProfessionalsDirectory> = {
  title: 'Business/ProfessionalsDirectory',
  component: ProfessionalsDirectory,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <BusinessManagerProvider>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Story />
        </div>
      </BusinessManagerProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfessionalsDirectory>;

export const Default: Story = {};

export const WithInviteAction: Story = {
  args: {
    onInvite: (professionalId) => {
      console.log(`Invited professional with ID: ${professionalId}`);
      return alert(`Invited professional with ID: ${professionalId}`);
    },
  },
};