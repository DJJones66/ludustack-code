﻿using LuduStack.Application.Interfaces;
using LuduStack.Domain.Core.Enums;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LuduStack.Application.ViewModels.Giveaway
{
    public class GiveawayViewModel : GiveawayBasicInfoViewModel, IGiveawayScreenViewModel
    {
        public List<GiveawayPrizeViewModel> Prizes { get; set; }

        public List<GiveawayEntryOptionViewModel> EntryOptions { get; set; }

        public List<GiveawayParticipantViewModel> Participants { get; set; }


        #region Extra
        public bool CanCountDown { get; set; }

        public string StatusMessage { get; set; }

        public int SecondsToEnd { get; set; }

        public bool ShowSponsor { get; set; }

        public bool ShowTimeZone { get; set; }

        public bool Future { get; set; }
        #endregion
    }
}