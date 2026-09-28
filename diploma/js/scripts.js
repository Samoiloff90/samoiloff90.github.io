window.onload = function() {
    const ui = SwaggerUIBundle({
      url: "./swagger/api.yaml",
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: "StandaloneLayout"
    });
  
    // PlantUML diagrams
    const diagrams = {
      'sequence-diagram-img': `@startuml
      Alice -> Bob: Hello Bob, how are you?
      Bob --> Alice: I am good thanks!
      @enduml`,
      'use-case-diagram-img': `@startuml
      User -> (Use the application)
      @enduml`
    };
  
    for (const [id, uml] of Object.entries(diagrams)) {
      const encoded = plantumlEncoder.encode(uml);
      document.getElementById(id).src = `https://www.plantuml.com/plantuml/svg/${encoded}`;
    }
  
    // BPMN diagram
    axios.get('./diagrams/bpmn/bpmn.bpmn')
    .then(response => {
      console.log('BPMN file loaded:', response.data);
      const viewer = new BpmnJS({ container: '#bpmn-container' });
      viewer.importXML(response.data, function(err) {
        if (err) {
          console.error('could not import BPMN 2.0 diagram', err);
        } else {
          const canvas = viewer.get('canvas');
          canvas.zoom('fit-viewport');
  
          // Add zoom in and zoom out functionality
          document.getElementById('zoom-in').addEventListener('click', function() {
            canvas.zoom(canvas.zoom() + 0.1);
          });
  
          document.getElementById('zoom-out').addEventListener('click', function() {
            canvas.zoom(canvas.zoom() - 0.1);
          });
        }
      });
    })
    .catch(error => {
      console.error('Error loading BPMN diagram:', error);
    });
  }
  