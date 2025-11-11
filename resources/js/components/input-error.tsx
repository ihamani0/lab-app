


export default function InputError({
    message
} : {
    message?: string
}) {
        return message ? (
        <p

            className='text-sm text-red-600 dark:text-red-400'
        >
            {message}
        </p>
    ) : null;

}
