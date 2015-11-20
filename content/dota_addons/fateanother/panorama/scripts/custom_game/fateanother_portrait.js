var masterUnit;

function PortraitShowTooltip()
{
	var txt = $("#ServantPortraitImage"); 
	$.DispatchEvent( 'DOTAShowTextTooltip', txt, "#Fateanother_Portrait_Tooltip");
}

function PortraitHideTooltip()
{
	var txt = $("#ServantPortraitImage"); 
	$.DispatchEvent( 'DOTAHideTextTooltip', txt );
}

function PortraitClick()
{
	var playerID = Players.GetLocalPlayer();
	var hero = Players.GetPlayerHeroEntityIndex( playerID )
	GameUI.SelectUnit(hero, false);
}

function MasterPortraitClick()
{
	if (!masterUnit) 
		return;
	GameUI.SelectUnit(masterUnit, false);
}
function MasterShowTooltip()
{
	var txt = $("#MasterPortraitImage"); 
	$.DispatchEvent( 'DOTAShowTextTooltip', txt, "#Fateanother_Master_Tooltip");
}

function MasterHideTooltip()
{
	var txt = $("#MasterPortraitImage"); 
	$.DispatchEvent( 'DOTAHideTextTooltip', txt );
}


function MasterHealthShowTooltip()
{
	var txt = $("#MasterHealthText"); 
	$.DispatchEvent( 'DOTAShowTextTooltip', txt, "#Fateanother_Master_Health_Tooltip");
}

function MasterHealthHideTooltip()
{
	var txt = $("#MasterHealthText"); 
	$.DispatchEvent( 'DOTAHideTextTooltip', txt );
}

function MasterManaShowTooltip()
{
	var txt = $("#MasterManaText"); 
	$.DispatchEvent( 'DOTAShowTextTooltip', txt, "#Fateanother_Master_Mana_Tooltip");
}

function MasterManaHideTooltip()
{
	var txt = $("#MasterManaText"); 
	$.DispatchEvent( 'DOTAHideTextTooltip', txt );
}

function UpdateHealthAndMana()
{
	var manaTxt = $("#MasterManaNumber"); 
	var healthTxt = $("#MasterHealthNumber"); 
	if (!manaTxt || !healthTxt || !masterUnit)
		return;

	var currentHealth = Entities.GetHealth(masterUnit);
	var maxHealth = Entities.GetMaxHealth(masterUnit);
	var currentMana = Entities.GetMana(masterUnit);
	healthTxt.text = currentHealth;
	manaTxt.text = currentMana;
	$.Schedule( 0.1, UpdateHealthAndMana);
}

function SetupPortrait(data)
{

	//$.Msg("panels present. linking abilities...")
	//var queryUnit = data.masterUnit; //Players.GetLocalPlayerPortraitUnit();
	var heroPortrait = $("#ServantPortraitImage");
	var playerID = Players.GetLocalPlayer();
	var hero = Players.GetPlayerHeroEntityIndex( playerID );
	var imageDir = "file://{images}/heroes/" + Entities.GetUnitName( hero ) + ".png";
	$.Msg(imageDir)
	heroPortrait.SetImage(imageDir) ;
	masterUnit = data.shardUnit;
	UpdateHealthAndMana();
}

function CheckTransportSelection(data)
{
	var playerID = Players.GetLocalPlayer();
	var mainSelected = Players.GetLocalPlayerPortraitUnit();
	var hero = Players.GetPlayerHeroEntityIndex( playerID )

	if (mainSelected == hero)
	{
		// check if transport is currently carrying Caster inside
		GameEvents.SendCustomGameEventToServer("check_hero_in_transport", {player: Players.GetLocalPlayer()})
	}

}

function SelectTransport(data)
{
	GameUI.SelectUnit(data.transport, false);
}
(function()
{
	GameEvents.Subscribe( "player_selected_hero", SetupPortrait);
	GameEvents.Subscribe( "dota_player_update_selected_unit", CheckTransportSelection );
	GameEvents.Subscribe( "player_selected_hero_in_transport", SelectTransport);
})();