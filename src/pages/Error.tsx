export default function ErrorNotFound() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full my-header">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <a
                    href="/"
                    className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Go back to Homepage
                </a>
            </div>
        </div>
    );
}
