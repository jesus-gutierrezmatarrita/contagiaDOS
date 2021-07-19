using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Proyecto_Redes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
namespace Proyecto_Redes.Controllers
{

    // http://173.230.130.7/game/?filter=owner

    public class GameController : Controller
    {
        // GET: GameController
        public IEnumerable<Game> Get( [FromHeader] string url)
        {
            IEnumerable<Game> news = null;

            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(url+"game/?filter=owner");
                    var responseTask = client.GetAsync("/game/");
                    responseTask.Wait();

                    var result = responseTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<IList<Game>>();
                        readTask.Wait();

                        news = readTask.Result;
                    }
                    else
                    {
                        news = Enumerable.Empty<Game>();
                    }
                }
            }
            catch
            {

                ModelState.AddModelError(string.Empty, "Server error. Please contact an administrator");

            }

            return news;
        }

  
  
        // POST: GameController/Create
        [HttpPost]
        public ActionResult Create( [FromHeader] String name ,[FromBody] Game body, [FromHeader] string url)
        {
            
           
            try
            {
                using (var client = new HttpClient())
                {
                  
                    client.BaseAddress = new Uri(url+"game/");
                    client.DefaultRequestHeaders.Add("name", name);
                    var postTask = client.PostAsJsonAsync("create", body);
                    postTask.Wait();
                    var contents = postTask.Result.Content.ReadAsStringAsync().Result;
                    var result = postTask.Result;
                    
                    if (result.IsSuccessStatusCode)
                    {
                        return new JsonResult(contents);
                    }
                    else
                    {
                        return new JsonResult(result);
                    }
                }

            }
            catch (DbUpdateException exception)
            {
                return new JsonResult(exception);
            }
        }


        [HttpGet]
        public ActionResult info([FromHeader] string name, [FromHeader] string password , [FromHeader] string gameId, [FromHeader] string url)
        {


            try
            {
                using (var client = new HttpClient())
                {

                    client.BaseAddress = new Uri(url+"game/");
                    client.DefaultRequestHeaders.Add("name", name);
                    client.DefaultRequestHeaders.Add("password", password);
                    var postTask = client.GetAsync(gameId);
                    postTask.Wait();
                    var contents = postTask.Result.Content.ReadAsStringAsync().Result;
                    var result = postTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        return new JsonResult(contents);
                    }
                    else
                    {
                        return new JsonResult(result);
                    }
                }

            }
            catch (DbUpdateException exception)
            {
                return new JsonResult(exception);
            }
        }



        [HttpPut]
        public ActionResult Join([FromBody] Game body, [FromHeader] string url)
        {


            try
            {
                using (var client = new HttpClient())
                {

                    client.BaseAddress = new Uri(url+"game/");
                    client.DefaultRequestHeaders.Add("name", body.name);
                    client.DefaultRequestHeaders.Add("password", body.password);
                    var putTask = client.PutAsync(body.gameId+"/join", null);
                    var contents = putTask.Result.Content.ReadAsStringAsync().Result;
                    putTask.Wait();

                    var result = putTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return new JsonResult(contents);
                    }
                    else
                    {
                        return new JsonResult(contents);
                    }
                }

            }
            catch (DbUpdateException exception)
            {
                return new JsonResult(exception);
            }
        }


     

        // POST: GameController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: GameController/Delete/5
       

      
        [HttpHead]
        public ActionResult StartGame([FromHeader]string name, [FromHeader]string password,[FromHeader] string gameId,[FromHeader] string url) 
        {
            try
            {
                using (var client = new HttpClient())
                {

                    client.BaseAddress = new Uri(url+"game/");
                    client.DefaultRequestHeaders.Add("name", name);
                    client.DefaultRequestHeaders.Add("password", password);
                    var putTask = client.SendAsync(new HttpRequestMessage(HttpMethod.Head,gameId + "/start"));
                    var contents = putTask.Result.Content.ReadAsStringAsync().Result;
                    putTask.Wait();

                    var result = putTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return Ok(result);
                    }
                }

            }
            catch (DbUpdateException exception)
            {
                return new JsonResult(exception);
            }

        }

        [HttpPost]
        public ActionResult ProposeGroup([FromHeader] string name, [FromHeader] string password, [FromHeader] string gameId, [FromBody] Group group, [FromHeader] string url)
        {


            try
            {
                using (var client = new HttpClient())
                {

                    client.BaseAddress = new Uri(url + "game/");
                    client.DefaultRequestHeaders.Add("name", name);
                    client.DefaultRequestHeaders.Add("password", password);
                    var postTask = client.PostAsJsonAsync(gameId+"/group", group);
                    postTask.Wait();
                    var contents = postTask.Result.Content.ReadAsStringAsync().Result;
                    var result = postTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        return new JsonResult(contents);
                    }
                    else
                    {
                        return new JsonResult(result);
                    }
                }

            }
            catch (DbUpdateException exception)
            {
                return new JsonResult(exception);
            }
        }

        [HttpPost]
        public ActionResult Go([FromHeader] string name, [FromHeader] string password, [FromHeader] string gameId, [FromBody] Psycho group, [FromHeader] string url)
        {


            try
            {
                using (var client = new HttpClient())
                {

                    client.BaseAddress = new Uri(url + "game/");
                    client.DefaultRequestHeaders.Add("name", name);
                    client.DefaultRequestHeaders.Add("password", password);
                    var postTask = client.PostAsJsonAsync(gameId + "/go", group);
                    postTask.Wait();
                    var contents = postTask.Result.Content.ReadAsStringAsync().Result;
                    var result = postTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        return new JsonResult(contents);
                    }
                    else
                    {
                        return new JsonResult(contents);
                    }
                }

            }
            catch (DbUpdateException exception)
            {
                return new JsonResult(exception);
            }
        }


    }
}
