import type { Meta, StoryObj } from '@storybook/react';
import { BusinessManagerProvider } from '../../contexts/BusinessManagerContext';
import IndustryInsightsDashboard from './IndustryInsightsDashboard';

const meta: Meta<typeof IndustryInsightsDashboard> = {
  title: 'Business/IndustryInsightsDashboard',
  component: IndustryInsightsDashboard,
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
type Story = StoryObj<typeof IndustryInsightsDashboard>;

export const Default: Story = {};