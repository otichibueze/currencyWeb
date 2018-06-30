

	if('serviceWorker' in navigator) {
	navigator.serviceWorker
		   .register('/sw.js')
		   .then(function() {
		   console.log("Service Worker Registered");
		   })
		   .catch(function(err){ console.log('Error couldnt register serviceWorker');})
		   ;
	}
	
	document.addEventListener("DOMContentLoaded",function(){
	
	 LoadDropList();
	 
	 let message_box = document.getElementById("message");
	 
	 message_box.style.display = 'none';
	 
		//Prevent default button click
		document.getElementById("convertbtn").addEventListener("click", function(event){
		event.preventDefault()
		});
	});
	
	
	function LoadDropList() {

        console.log('started my function');

            const currencies = 'https://free.currencyconverterapi.com/api/v5/currencies?';

			//this method is to fetch url
			fetch(currencies, {
			method: 'get'
			}).then(function(response) {
				console.log('successful');
				return response.json();
			}).then(function(data) {
			
			//get object count
			let count = Object.keys(data.results).length;
			
			console.log(count);
		
			//here we get reference to dropdown
			let fromOptions = document.getElementById('from_currency');
			let toOptions = document.getElementById('to_currency');
			
			//here we loop through to populate dropdown
			for (let i = 0; i < count; i++) {
				
				let to_values = document.createElement("option"); 
				to_values.textContent = Object.values(data.results)[i].currencyName;
				to_values.value = Object.values(data.results)[i].id;
				
				let from_values = document.createElement("option"); 
				from_values.textContent = Object.values(data.results)[i].currencyName;
				from_values.value = Object.values(data.results)[i].id;
				
				toOptions.appendChild(to_values);
				fromOptions.appendChild(from_values);
			}
			})
			.catch(function(err) {
				console.log(`Error failure  ${err}`);
			});

    };
	

	function setRate(value)
	{
		//here we get reference to html id's
				let message_box = document.getElementById("message");
				let fromOptions = document.getElementById('from_currency');
				let toOptions = document.getElementById('to_currency');
				let text_description = document.getElementById('description');
				const Input_Amount = document.getElementById('InputAmount').value
				let result = document.getElementById('result');

				const from_selected = {
				value : fromOptions.options[fromOptions.selectedIndex].value,
				Text : fromOptions.options[fromOptions.selectedIndex].textContent
				};

				const to_selected = {
				value : toOptions.options[toOptions.selectedIndex].value,
				Text : toOptions.options[toOptions.selectedIndex].textContent
				};
		
		
		if (isNaN(Input_Amount)) {
				text = "Input not valid, Please enter a integer value";
				message_box.innerHTML = text;
				message_box.style.display = 'block';
				
				text_description.innerHTML = "";
				result.innerHTML = "";
			} 
			else if(from_selected.value === "0" || to_selected.value === "0")
			{
				text = "Please select currency to convert from list";
				message_box.innerHTML = text;
				message_box.style.display = 'block';
				
				text_description.innerHTML = "";
				result.innerHTML = "";
			}
			else
			{
				document.getElementById("message").innerHTML = "";
				message_box.style.display = 'none';
    
		
						
				console.log(`value on exhange class is ${value}`);

				if(value != null)
				{
					//get json returned value
					const exchange_value = value;

					//Display exchange value in text
					text_description.innerHTML = `Exchange rate from  ${from_selected.Text} to ${to_selected.Text} is ${exchange_value}`;


					//Display conversion
					//console.log(`Input value = ${InputAmount}`);
					let my_result = Input_Amount * exchange_value;

					console.log(`result value from database = ${my_result}`);
					result.innerHTML	 = `${to_selected.value} ${my_result}`;
				}
				else{
					text = "You need internet to get this exchange rate ";
					message_box.innerHTML = text;
					message_box.style.display = 'block';
					
					text_description.innerHTML = "";
					result.innerHTML = "";
				}
			}
	};
	
	function GetExchange() {
			//here we get reference to html id's
			let message_box = document.getElementById("message");
			let fromOptions = document.getElementById('from_currency');
			let toOptions = document.getElementById('to_currency');
			let text_description = document.getElementById('description');
			const Input_Amount = document.getElementById('InputAmount').value
			let result = document.getElementById('result');
			
			const from_selected = {
			value : fromOptions.options[fromOptions.selectedIndex].value,
			Text : fromOptions.options[fromOptions.selectedIndex].textContent
			};
			
			const to_selected = {
			value : toOptions.options[toOptions.selectedIndex].value,
			Text : toOptions.options[toOptions.selectedIndex].textContent
			};
			
			// textbox validation
			if (isNaN(Input_Amount)) {
				text = "Input not valid, Please enter a integer value";
				message_box.innerHTML = text;
				message_box.style.display = 'block';
				
				text_description.innerHTML = "";
				result.innerHTML = "";
			} 
			else if(from_selected.value === "0" || to_selected.value === "0")
			{
				text = "Please select currency to convert from list";
				message_box.innerHTML = text;
				message_box.style.display = 'block';
				
				text_description.innerHTML = "";
				result.innerHTML = "";
			}
			else{
				
				document.getElementById("message").innerHTML = "";
				message_box.style.display = 'none';
    
			
			
			
			console.log(`From selected = ${from_selected.value}`);
			console.log(`To selected currency = ${to_selected.value}`);
			
			
			
				if(navigator.onLine){
				
						const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${from_selected.value}_${to_selected.value}&compact=ultra`;

						console.log(`selected url api = ${url}`);


						//fetch rate
						fetch(url, {
						method: 'get'
						}).then(function(response) {
						return response.json();
						}).then(function(data) {

						//get json returned value
						const exchange_value = Object.values(data)[0];

						//Display exchange value in text
						text_description.innerHTML = `Exchange rate from  ${from_selected.Text} to ${to_selected.Text} is ${exchange_value}`;


						//Display conversion
						//console.log(`Input value = ${InputAmount}`);
						let my_result = Input_Amount * exchange_value;

						console.log(`result value = ${my_result}`);
						result.innerHTML	 = `${to_selected.value} ${my_result}`;
						//result.style.display = 'block';


						//save values
						saveExchange(`${from_selected.value}_${to_selected.value}`,`${exchange_value}`);

						})
						.catch(function(err) {
						console.log(`Error failure  ${err}`);

						});



				} else {
						getExchange(`${from_selected.value}_${to_selected.value}`);
				}
			}
		
			};
           

		   
		   

