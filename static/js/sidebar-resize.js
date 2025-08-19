// Funcionalidad para redimensionar el sidebar
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.theme-doc-sidebar-container');
  
  if (!sidebar) return;
  
  let isResizing = false;
  let startX;
  let startWidth;
  
  // Función para iniciar el redimensionamiento
  function startResize(e) {
    isResizing = true;
    startX = e.clientX;
    startWidth = parseInt(getComputedStyle(sidebar).width, 10);
    
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    
    // Prevenir selección de texto
    e.preventDefault();
  }
  
  // Función para redimensionar
  function resize(e) {
    if (!isResizing) return;
    
    const width = startWidth + (e.clientX - startX);
    const minWidth = 200;
    const maxWidth = 600;
    
    // Aplicar límites
    if (width >= minWidth && width <= maxWidth) {
      sidebar.style.width = width + 'px';
    }
  }
  
  // Función para detener el redimensionamiento
  function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }
  
  // Agregar evento de mousedown al sidebar
  sidebar.addEventListener('mousedown', function(e) {
    // Solo activar si se hace clic en el borde derecho
    const rect = sidebar.getBoundingClientRect();
    if (e.clientX > rect.right - 10) {
      startResize(e);
    }
  });
  
  // Cambiar cursor cuando esté sobre el área de redimensionamiento
  sidebar.addEventListener('mousemove', function(e) {
    const rect = sidebar.getBoundingClientRect();
    if (e.clientX > rect.right - 10) {
      sidebar.style.cursor = 'col-resize';
    } else {
      sidebar.style.cursor = 'default';
    }
  });
});
