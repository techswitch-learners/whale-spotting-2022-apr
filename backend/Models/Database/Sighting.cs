using System;

namespace WhaleSpotting.Models.Database
{
    public class Sighting
    {
        public int Id { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string PhotoUrl { get; set; }

        //public Species Species {get; set;}

        public bool Approved { get; set; }

        public bool Deleted { get; set; }
    }
}
