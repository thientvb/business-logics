namespace BusinessLogicsAPI.Exceptions
{
    public class BusinessException : Exception
    {
        public BusinessException(string errorMessage)
            : base(errorMessage)
        {

        }

        public BusinessException(string? message, Exception? innerException)
            : base(message, innerException)
        {

        }
    }
}
