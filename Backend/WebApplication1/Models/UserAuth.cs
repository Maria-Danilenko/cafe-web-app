using System;
using System.ComponentModel.DataAnnotations;
using WebApplication4.Services;

namespace WebApplication4.Models
{
    public class UserAuth
    {
        public int Id { get; set; }

        [MaxLength(15)]
        public string FirstName { get; set; }

        [MaxLength(15)]
        public string LastName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        private string _password;
        public string Password
        {
            get { return _password; }
            set { _password = EncryptionService.EncryptPassword(value); }
        }

        public DateTime LastLogin { get; set; }

        public int FailedLoginAttempts { get; set; }

    }
}
