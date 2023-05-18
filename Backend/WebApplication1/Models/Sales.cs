using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Sales
    {
        public int Id { get; set; }

        public int Dish_id { get; set; }

        public int Type_id { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date_of_sale { get; set; }
    }
}
