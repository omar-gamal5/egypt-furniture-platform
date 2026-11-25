import type { Meta, StoryObj } from '@storybook/react';
import { BusinessManagerProvider } from '../../contexts/BusinessManagerContext';
import JobPostingForm from './JobPostingForm';

const meta: Meta<typeof JobPostingForm> = {
  title: 'Business/JobPostingForm',
  component: JobPostingForm,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <BusinessManagerProvider>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Story />
        </div>
      </BusinessManagerProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof JobPostingForm>;

export const Default: Story = {};

export const WithSuccessCallback: Story = {
  args: {
    onSuccess: () => {
      console.log('Job posting success callback triggered');
      alert('Job posting created successfully!');
    },
  },
};