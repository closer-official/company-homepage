import { redirect } from 'next/navigation';

const CUSTOMER_INTAKE_URL = 'https://webpage.closer-official.com/api/customer-intake';

export default function HearingPage() {
  redirect(CUSTOMER_INTAKE_URL);
}
