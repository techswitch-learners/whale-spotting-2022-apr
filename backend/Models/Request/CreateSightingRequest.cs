using System;
using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request
{
    public class CreateSightingRequest
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        [Range (-90,90, ErrorMessage = "Latitude must be between -90 and 90")]
        public double Latitude { get; set; }

        [Required]
        [Range (-180,180, ErrorMessage = "Longitude must be between -180 and 180")]
        public double Longitude { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        public string PhotoUrl { get; set; }

        public int SpeciesId { get; set;} 
    }
}