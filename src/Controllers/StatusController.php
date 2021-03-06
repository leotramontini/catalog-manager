<?php

namespace Manager\Controllers;

use Manager\Service\StatusService;
use Manager\Transformer\StatusTransformer;
use Manager\Exceptions\ServiceProcessException;

class StatusController extends BaseController
{
    /**
     * @var \Manager\Service\StatusService
     */
    protected $statusService;

    /**
     * StatusController constructor.
     * @param \Manager\Service\StatusService $statusService
     */
    public function __construct(StatusService $statusService)
    {
        $this->statusService = $statusService;
    }

    /**
     * @return mixed
     */
    public function getAll()
    {
        try {
            $statuses = $this->statusService->getAllStatus();
        } catch (ServiceProcessException $error) {
            $this->throwErrorBadRequest($error->getMessage());
        }

        return $this->collection($statuses, new StatusTransformer());
    }
}
