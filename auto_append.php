<?php
$output = ob_get_contents();
ob_end_clean();

#$output = str_replace('http://localhost:4001/', 'https://lab.npeu.ox.ac.uk/styleguide/', $output);
$output = str_replace('href="/',        'href="/styleguide/', $output);
$output = str_replace('link.href = \'/','link.href = \'/styleguide/', $output);
$output = str_replace('<script src="/', '<script src="/styleguide/', $output);
$output = str_replace('/assets',     '/styleguide/assets', $output);
$output = str_replace('data="/',        'data="/styleguide/', $output);
$output = str_replace('name="msapplication-config" content="/', 'name="msapplication-config" content="/styleguide/', $output);

echo $output;
?>