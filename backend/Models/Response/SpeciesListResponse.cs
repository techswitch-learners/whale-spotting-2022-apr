using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using System.Linq;

namespace WhaleSpotting.Models.Response
{
    public class SpeciesListItemResponse {
        public int Id {get; set;}
        public string Name {get; set;}
        public string LatinName {get; set;}
        public string EndangeredStatus {get; set;}
        public string ImageUrl {get; set;}
        public string Description {get; set;}

        public SpeciesListItemResponse(Species species) {
            Id = species.Id;
            Name = species.Name;
            LatinName = species.LatinName;
            EndangeredStatus = species.EndangeredStatus;
            ImageUrl = species.ImageUrl;
            Description = species.Description;
        } 
    }

    public class SpeciesListResponse
    {
        public List<SpeciesListItemResponse> SpeciesList;

        public SpeciesListResponse(IEnumerable<Species> items)
        {
            SpeciesList = items.Select(item => new SpeciesListItemResponse(item)).ToList();
        }
    }
}


