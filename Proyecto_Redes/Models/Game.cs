using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Proyecto_Redes.Models
{
    public class Game
    {
        public string gameId { get; set; }

        public string name { get; set; }

        public string owner { get; set; }

        public string password { get; set; }

        public virtual ICollection<string> players { get; set; }

        public virtual ICollection<string> psychos { get; set; }

        public virtual ICollection<Boolean> psychoWin { get; set; }

        public string status { get; set; }




    }
}
