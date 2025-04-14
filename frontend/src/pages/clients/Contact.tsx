import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from 'lucide-react'
import Button from '../../components/ui/Button'
const Contact = () => {
    return (
        <div className="bg-white w-full">
            {/* Hero Section */}
            <div className="bg-blue-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Have questions or feedback? We'd love to hear from you. Get in touch
                        with our team.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                        <p className="text-gray-600 mb-8">
                            We're here to help! Whether you have a question about our
                            products, orders, or anything else, our team is ready to answer
                            all your questions.
                        </p>
                        <div className="space-y-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                                        <MapPinIcon size={24} className="text-blue-900" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Our Location
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        123 Fashion Street, City, Country
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                                        <PhoneIcon size={24} className="text-blue-900" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Phone Number
                                    </h3>
                                    <p className="text-gray-600 mt-1">+1 234 567 8901</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                                        <MailIcon size={24} className="text-blue-900" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Email Address
                                    </h3>
                                    <p className="text-gray-600 mt-1">info@fashionhub.com</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
                                        <ClockIcon size={24} className="text-blue-900" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Working Hours
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        Mon - Fri: 9:00 AM - 6:00 PM
                                    </p>
                                    <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                            <form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="first-name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="last-name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="last-name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter subject"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>
                                <Button type="submit" size="lg">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Map */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Our Location</h2>
                    <div className="h-96 bg-gray-200 rounded-lg">
                        {/* Replace with actual map component if needed */}
                        <div className="h-full w-full flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <MapPinIcon size={48} className="mx-auto mb-2" />
                                <p>Map would be displayed here</p>
                                <p className="text-sm">123 Fashion Street, City, Country</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact
