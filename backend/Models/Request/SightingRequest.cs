using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class SightingRequest
    {
        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }
        public Species SpeciesVal { get; set; }
    }
}